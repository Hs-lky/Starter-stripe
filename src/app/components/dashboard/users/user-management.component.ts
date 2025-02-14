import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p class="text-gray-600">Manage your organization's users and their roles.</p>
      </div>

      <!-- Actions Bar -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <!-- Search -->
        <div class="relative flex-1">
          <input type="text" 
                 placeholder="Search users..."
                 class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <!-- Filters -->
        <div class="flex gap-4">
          <select class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
          </select>

          <select class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button class="px-4 py-2 bg-primary-500 text-white rounded-xl
                         hover:bg-primary-600 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <i class="fas fa-plus mr-2"></i>
            Add User
          </button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              @for (user of users; track user.id) {
                <tr class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" 
                             [src]="'https://ui-avatars.com/api/?name=' + user.name" 
                             [alt]="user.name">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{user.name}}</div>
                        <div class="text-sm text-gray-500">{{user.email}}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          [class]="getRoleBadgeClass(user.role)">
                      {{user.role}}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          [class]="getStatusBadgeClass(user.status)">
                      {{user.status}}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{user.lastLogin}}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-primary-600 hover:text-primary-900 mr-3">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">1</span>
                  to
                  <span class="font-medium">10</span>
                  of
                  <span class="font-medium">20</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Previous</span>
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600">
                    2
                  </button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Next</span>
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserManagementComponent {
  users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2 hours ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      lastLogin: '1 day ago'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'inactive',
      lastLogin: '1 week ago'
    }
  ];

  getRoleBadgeClass(role: string): string {
    const baseClasses = 'bg-opacity-10 ';
    switch (role.toLowerCase()) {
      case 'admin':
        return baseClasses + 'bg-purple-500 text-purple-800';
      case 'editor':
        return baseClasses + 'bg-blue-500 text-blue-800';
      default:
        return baseClasses + 'bg-gray-500 text-gray-800';
    }
  }

  getStatusBadgeClass(status: string): string {
    const baseClasses = 'bg-opacity-10 ';
    switch (status) {
      case 'active':
        return baseClasses + 'bg-green-500 text-green-800';
      case 'inactive':
        return baseClasses + 'bg-red-500 text-red-800';
      default:
        return baseClasses + 'bg-gray-500 text-gray-800';
    }
  }
} 