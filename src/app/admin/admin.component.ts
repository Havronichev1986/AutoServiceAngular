// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth/service';

// @Component({
//   standalone: true,
//   selector: 'app-admin',
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css'],
// })
// export class AdminComponent implements OnInit {
//   users: any[] = []; // сюда подгружаются пользователи из API
//   filter: string = '';
//   currentPage = 1;
//   pageSize = 5;

//   constructor(private http: HttpClient, public authService: AuthService) {}

//   ngOnInit() {
//     const roles = this.authService.getRolesFromToken();
//     console.log('Роли пользователя:', roles);
//     console.log('isAdmin:', this.authService.hasRole('ADMIN'));
//     this.loadUsers();
//   }

//   loadUsers() {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http
//       .get<any[]>('http://localhost:8080/api/users', { headers })
//       .subscribe({
//         next: (data) => (this.users = data),
//         error: (err) => console.error('Ошибка загрузки пользователей', err),
//       });
//   }

//   deleteUser(id: number) {
//     if (confirm('Удалить пользователя?')) {
//       this.http.delete(`http://localhost:8080/api/users/${id}`).subscribe({
//         next: () => this.loadUsers(),
//         error: (err) => console.error('Ошибка удаления', err),
//       });
//     }
//   }
//   filteredUsers() {
//     return this.users.filter((user) =>
//       user.email.toLowerCase().includes(this.filter.toLowerCase())
//     );
//   }

//   pages() {
//     const total = Math.ceil(this.filteredUsers().length / this.pageSize);
//     return Array(total)
//       .fill(0)
//       .map((_, i) => i + 1);
//   }
// }




import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/service';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: any[] = []; // сюда подгружаются пользователи из API
  filter: string = '';
  currentPage = 1;
  pageSize = 5;

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit() {
    const roles = this.authService.getRolesFromToken();
    console.log('Роли пользователя:', roles);
    console.log('isAdmin:', this.authService.hasRole('ADMIN'));
    this.loadUsers();
  }

  loadUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .get<any[]>('http://localhost:8080/api/users', { headers })
      .subscribe({
        next: (data) => (this.users = data),
        error: (err) => console.error('Ошибка загрузки пользователей', err),
      });
  }

  deleteUser(id: number) {
    if (confirm('Удалить пользователя?')) {
      this.http.delete(`http://localhost:8080/api/users/${id}`).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Ошибка удаления', err),
      });
    }
  }

  filteredUsers() {
    // Фильтрация пользователей по email
    return this.users.filter((user) =>
      user.email.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  // Получение списка страниц для пагинации
  pages() {
    const total = Math.ceil(this.filteredUsers().length / this.pageSize);
    return Array(total)
      .fill(0)
      .map((_, i) => i + 1);
  }

  // Получение пользователей для текущей страницы
  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredUsers().slice(startIndex, endIndex);
  }

  // Переход на следующую страницу
  nextPage() {
    if (this.currentPage < this.pages().length) {
      this.currentPage++;
    }
  }

  // Переход на предыдущую страницу
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Переключение на конкретную страницу
  goToPage(page: number) {
    this.currentPage = page;
  }
}