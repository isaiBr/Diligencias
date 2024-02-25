using System;
using System.Collections.Generic;

namespace Diligencias.Models.DB
{
    public partial class Proveedore
    {
        public int Id { get; set; }
        public string? RazonSocial { get; set; }
        public string? NombreComercial { get; set; }
        public string? IdentificacionTributaria { get; set; }
        public string? NumeroTelefonico { get; set; }
        public string? CorreoElectronico { get; set; }
        public string? SitioWeb { get; set; }
        public string? DireccionFisica { get; set; }
        public string? Pais { get; set; }
        public decimal? FacturacionAnual { get; set; }
        public DateTime? FechaEdicion { get; set; }
    }
}
