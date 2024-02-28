using Diligencias.Models.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpDelete]
        [Route("eliminar")]
        public async Task EliminarProveedor(int id)
        {
            var proveedorBorrado = await ctx.Proveedores.FindAsync(id);

            ctx.Proveedores.Remove(proveedorBorrado);

            await ctx.SaveChangesAsync();
        }
    }
}
