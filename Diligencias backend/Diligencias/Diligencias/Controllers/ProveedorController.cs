using Diligencias.Models.DB;
using Diligencias.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

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
        public async Task<IActionResult> CrearProveedor(Proveedore proveedor)
        {
            var correcto = _service.verificaProveedor(proveedor).Item1;
            var mensaje = _service.verificaProveedor(proveedor).Item2;

            if(!correcto)
                return BadRequest(new { mensaje = mensaje});

            try
            {
                await _service.CrearProveedor(proveedor);
                return Ok(new { mensaje = "Proveedor creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = "Error interno del servidor" });
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = "Error interno del servidor" });
            }
        }

        [HttpGet]
        [Route("ver")]
        public async Task<IActionResult> VerProveedor(int id)
        {
            if (id <1)
            {
                return BadRequest(new { mensaje = "Debe ingresar un id valido" });
            }
            try
            {
                Proveedore proveedor = await _service.VerProveedor(id);
                if (proveedor == null)
                    return NotFound(new { mensaje = "Proveedor no encontrado" });

                return Ok(proveedor);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = "Error interno del servidor" });
            }
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> ActualizarProveedor(int id, Proveedore proveedor)
        {
            if (id < 1)
            {
                return BadRequest(new { mensaje = "Debe ingresar un id validos" });
            }
            var correcto = _service.verificaProveedor(proveedor).Item1;
            var mensaje = _service.verificaProveedor(proveedor).Item2;

            if (!correcto)
                return BadRequest(new { mensaje = mensaje });

            try
            {
                Proveedore proveedorExistente = await _service.ActualizarProveedor(id, proveedor);
                if (proveedorExistente == null)
                    return NotFound(new { mensaje = "Proveedor no encontrado" });

                return Ok(new { mensaje = "Proveedor actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = "Error interno del servidor" });
            }
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> EliminarProveedor(int id)
        {
            if (id < 1)
            {
                return BadRequest(new { mensaje = "Debe ingresar un id valido" });
            }
            try
            {
                await _service.EliminarProveedor(id);
                return Ok(new { mensaje = "Proveedor eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = "Error interno del servidor" });
            }
        }
    }
}
