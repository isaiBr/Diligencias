using System;
using System.Collections.Generic;

namespace Diligencias.Models.DB
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string? Correo { get; set; }
        public string? NombreUsuario { get; set; }
        public string? Contrasena { get; set; }
        public string? NombreCompleto { get; set; }
        public string? Rol { get; set; }
    }
}
