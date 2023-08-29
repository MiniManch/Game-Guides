function getCurrentUser() {
    const username = localStorage.getItem('username');
    return username ? username : null;
}
 
export let defaultProfileImage = 'https://i.ibb.co/GpGk4t5/OIG-removebg-preview.png';
export let homeLogoImage = 'https://i.ibb.co/Srp0GfS/f5142431-6e40-44d7-bdaf-aa204ea3c1f8-removebg-preview.png';

export default getCurrentUser;