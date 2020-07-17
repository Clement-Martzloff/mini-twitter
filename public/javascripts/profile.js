window.addEventListener('DOMContentLoaded', () => {
  const inputAvatar = document.querySelector('#avatar-input');
  const formContainer = document.querySelector('#form-container');

  formContainer.addEventListener('click', () => {
    inputAvatar.click();
  });

  inputAvatar.addEventListener('change', () => {
    formContainer.submit();
  });
});
