using Diligencias.Models.DB;
using Diligencias.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Diligencias.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            this._service = service;
        }

        [HttpGet]
        [Route("auth")]
        public async Task<IActionResult> BuscarUsuario(string correo, string password)
        {
            try
            {
                Usuario usuario = await _service.BuscarUsuario(correo, password);
                if (usuario == null)
                    return NotFound();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return NotFound();
            }

        }
    }
}
