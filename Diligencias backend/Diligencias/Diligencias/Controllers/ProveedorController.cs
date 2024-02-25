using Diligencias.Models.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Diligencias.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorController : ControllerBase
    {
        private readonly PruebaEYContext ctx;

        public ProveedorController(PruebaEYContext context)
        {
            this.ctx = context;
        }

        [HttpPost]
        [Route("crear")]
        public async Task<IActionResult>CrearProveedor(Proveedore proveedor)
        {
            await ctx.Proveedores.AddAsync(proveedor);
            await ctx.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("listar")]
        public async Task<ActionResult<IEnumerable<Proveedore>>> ListaProveedores()
        {
            var proveedores = await ctx.Proveedores.ToListAsync();

            return Ok(proveedores);
        }

        [HttpGet]
        [Route("ver")]
        public async Task<IActionResult> VerProveedor(int id)
        {
            Proveedore proveedor = await ctx.Proveedores.FindAsync(id);
            if(proveedor == null)
                return NotFound();
            return Ok(proveedor);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> ActualizarProveedor(int id, Proveedore proveedor)
        {
            Proveedore proveedorExistente = await ctx.Proveedores.FindAsync(id);

            if(proveedorExistente == null)
                return NotFound();

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
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> EliminarProveedor(int id)
        {
            var proveedorBorrado = await ctx.Proveedores.FindAsync(id);

            if (proveedorBorrado == null)
                return NotFound();

            ctx.Proveedores.Remove(proveedorBorrado);

            await ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
