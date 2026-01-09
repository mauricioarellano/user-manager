import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { User, UserFormData } from '../types';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import UserModal from '../components/UserModal';
import { formatDate, formatRole, downloadFile } from '../utils/format';
import { sanitizeInput } from '../utils/sanitize';

const Users: React.FC = () => {
  const { isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    if (searchParams.get('action') === 'create' && isAdmin()) {
      setIsModalOpen(true);
      setSelectedUser(null);
      setSearchParams({});
    }
  }, [searchParams, isAdmin, setSearchParams]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, perPage, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers(currentPage, perPage, search);
      setUsers(response.data);
      setCurrentPage(response.current_page);
      setLastPage(response.last_page);
      setTotal(response.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(sanitizeInput(searchInput));
    setCurrentPage(1);
  };

  const handleCreateUser = async (data: UserFormData) => {
    await userService.createUser(data);
    fetchUsers();
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (selectedUser) {
      await userService.updateUser(selectedUser.id, data);
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await userService.deleteUser(id);
      fetchUsers();
      setDeleteConfirm(null);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error al eliminar usuario');
    }
  };

  const handleExportCsv = async () => {
    try {
      const blob = await userService.exportToCsv();
      downloadFile(blob, `users_${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error al exportar CSV');
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Total: {total} usuario{total !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-2">
                  {isAdmin() && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedUser(null);
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Crear Usuario
                      </button>
                      <button
                        onClick={handleExportCsv}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Exportar CSV
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Buscar por nombre, email o teléfono..."
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Buscar
                  </button>
                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setSearchInput('');
                        setCurrentPage(1);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Limpiar
                    </button>
                  )}
                </form>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No se encontraron usuarios</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Teléfono
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rol
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Creado
                          </th>
                          {isAdmin() && (
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.phone || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {formatRole(user.role)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(user.created_at)}
                            </td>
                            {isAdmin() && (
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => openEditModal(user)}
                                  className="text-primary-600 hover:text-primary-900 mr-4"
                                >
                                  Editar
                                </button>
                                {deleteConfirm === user.id ? (
                                  <span className="inline-flex gap-2">
                                    <button
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      Confirmar
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirm(null)}
                                      className="text-gray-600 hover:text-gray-900"
                                    >
                                      Cancelar
                                    </button>
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => setDeleteConfirm(user.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Eliminar
                                  </button>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        user={selectedUser}
        title={selectedUser ? 'Editar Usuario' : 'Crear Usuario'}
      />
    </div>
  );
};

export default Users;

