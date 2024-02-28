using Diligencias.Models.DB;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Serialization;

namespace Diligencias.Services
{
    public class UsuarioService
    {
        private readonly PruebaEYContext ctx;

        public UsuarioService(PruebaEYContext context)
        {
            this.ctx = context;
        }

        public async Task<Usuario> BuscarUsuario(string correo, string password)
        {
            Usuario user = await ctx.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo && u.Contrasena == password);

            return user;
        }
    }
}
