const formatDate = (dateString) => {
  const formattedDate = new Date(dateString).toLocaleDateString('es-ES');
  return formattedDate;
};

export { formatDate };
