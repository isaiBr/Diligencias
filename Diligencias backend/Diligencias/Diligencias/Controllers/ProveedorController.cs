using Diligencias.Models.DB;
using Diligencias.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Diligencias.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorController : ControllerBase
    {
        private readonly ProveedorService _service;

        public ProveedorController(ProveedorService service)
        {
            this._service = service;
        }

        [HttpPost]
        [Route("crear")]
        public async Task<IActionResult>CrearProveedor(Proveedore proveedor)
        {
            try
            {
                await _service.CrearProveedor(proveedor);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }

        }

        [HttpGet]
        [Route("listar")]
        public async Task<ActionResult<IEnumerable<Proveedore>>> ListaProveedores()
        {
            try
            {
                var proveedores = await _service.ListaProveedores();
                return Ok(proveedores);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("ver")]
        public async Task<IActionResult> VerProveedor(int id)
        {
            try
            {
                Proveedore proveedor = await _service.VerProveedor(id);
                if (proveedor == null)
                    return NotFound();
                return Ok(proveedor);
            }
            catch (Exception ex) {
                return NotFound();
            }
            
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> ActualizarProveedor(int id, Proveedore proveedor)
        {
            try
            {
                Proveedore proveedorExistente = await _service.ActualizarProveedor(id, proveedor);
                if (proveedor == null)
                    return NotFound();
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }

        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> EliminarProveedor(int id)
        {
            try
            {
                await _service.EliminarProveedor(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}
