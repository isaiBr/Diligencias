using Diligencias.Models.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Diligencias.Services
{
    public class ProveedorService
    {
        private readonly PruebaEYContext ctx;

        public ProveedorService(PruebaEYContext context)
        {
            this.ctx = context;
        }

        public async Task CrearProveedor(Proveedore proveedor)
        {
            await ctx.Proveedores.AddAsync(proveedor);
            await ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<Proveedore>> ListaProveedores()
        {
            return await ctx.Proveedores.ToListAsync();

        }

        public async Task<Proveedore> VerProveedor(int id)
        {
            Proveedore proveedor = await ctx.Proveedores.FindAsync(id);
            if (proveedor == null) return null;
            return proveedor;
        }

        public async Task<Proveedore> ActualizarProveedor(int id, Proveedore proveedor)
        {
            Proveedore proveedorExistente = await ctx.Proveedores.FindAsync(id);

            if(proveedorExistente == null)
                return null;

            proveedorExistente.RazonSocial = proveedor.RazonSocial;
            proveedorExistente.NombreComercial = proveedor.NombreComercial;
            proveedorExistente.IdentificacionTributaria = proveedor.IdentificacionTributaria;
            proveedorExistente.NumeroTelefonico = proveedor.NumeroTelefonico;
            proveedorExistente.CorreoElectronico = proveedor.CorreoElectronico;
            proveedorExistente.SitioWeb = proveedor.SitioWeb;
            proveedorExistente.DireccionFisica = proveedor.DireccionFisica;
            proveedorExistente.Pais = proveedor.Pais;
            proveedorExistente.FacturacionAnual = proveedor.FacturacionAnual;
            proveedorExistente.FechaEdicion = proveedor.FechaEdicion;

            await ctx.SaveChangesAsync();
            return proveedor;
        }

        public async Task EliminarProveedor(int id)
        {
            var proveedorBorrado = await ctx.Proveedores.FindAsync(id);

            ctx.Proveedores.Remove(proveedorBorrado);

            await ctx.SaveChangesAsync();
        }

        public (bool, string) verificaProveedor (Proveedore proveedor)
        {
            if (proveedor == null)
            {
                return (false, "Debe ingresar un body");
            }

            if (string.IsNullOrEmpty(proveedor.NombreComercial) || string.IsNullOrEmpty(proveedor.RazonSocial) || string.IsNullOrEmpty(proveedor.IdentificacionTributaria)
                || string.IsNullOrEmpty(proveedor.CorreoElectronico) || proveedor.FacturacionAnual == null)
            {
                return (false,"Los siguientes campos son obligatorios: NombreComercial, RazonSocial, IdentificacionTributaria, CorreoElectronico, FacturacionAnual" );
            }
            if (proveedor.FacturacionAnual < 0)
            {
                return (false, "La facturacion anual no puede ser negativa" );
            }
            if (!string.IsNullOrEmpty(proveedor.NumeroTelefonico) && !Regex.IsMatch(proveedor.NumeroTelefonico, @"^\d+$"))
            {
                return (false, "El número telefónico debe contener solo números" );
            }
            if (!string.IsNullOrEmpty(proveedor.NombreComercial) && !Regex.IsMatch(proveedor.NombreComercial, @"^[a-zA-Z0-9\s]+$"))
            {
                return (false,"El nombre comercial debe ser alfanumérico y puede incluir espacios en blanco" );
            }
            if (!string.IsNullOrEmpty(proveedor.RazonSocial) && !Regex.IsMatch(proveedor.RazonSocial, @"^[a-zA-Z0-9\s]+$"))
            {
                return (false, "La Razon Social debe ser alfanumérico y puede incluir espacios en blanco" );
            }
            if (!string.IsNullOrEmpty(proveedor.DireccionFisica) && !Regex.IsMatch(proveedor.DireccionFisica, @"^[a-zA-Z0-9\s]+$"))
            {
                return (false, "El Direccion Fisica debe ser alfanumérico y puede incluir espacios en blanco" );
            }
            if (!string.IsNullOrEmpty(proveedor.CorreoElectronico) && !Regex.IsMatch(proveedor.CorreoElectronico, @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))
            {
                return (false,"El formato del correo electrónico no es válido" );
            }
            if (!string.IsNullOrEmpty(proveedor.SitioWeb) && !Uri.TryCreate(proveedor.SitioWeb, UriKind.Absolute, out _))
            {
                return (false,"El formato de la página web no es válido" );
            }
            if (!string.IsNullOrEmpty(proveedor.IdentificacionTributaria) && !Regex.IsMatch(proveedor.IdentificacionTributaria, @"^\d{11}$"))
            {
                return (false,"La identificacion tributaria es de 11 digitos y solo números");
            }
            if(!string.IsNullOrEmpty(proveedor.Pais) && !Regex.IsMatch(proveedor.Pais, @"^[a-zA-Z\s]+$"))
            {
                return (false, "El Pais debe ser una cadena de texto");
            }
            return (true, "ok");
        }

    }
}
