import toastr from "toastr"

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

export const successMessage = (msg, title) => {
    toastr["success"](msg, title)
}

export const infoMessage = (msg, title) => {
    toastr["info"](msg, title)
}

export const warningMessage = (msg, title) => {
    toastr["warning"](msg, title)
}

export const errorMessage = (msg, title) => {
    toastr["error"](msg, title)
}