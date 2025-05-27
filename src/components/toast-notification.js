import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

class NotificationService {
  static success(message) {
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  static error(message) {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  static info(message) {
    Toast.fire({
      icon: 'info',
      title: message,
    });
  }

  static confirm(title, text) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });
  }
}

export default NotificationService;