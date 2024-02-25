using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Diligencias.Models.DB
{
    public partial class PruebaEYContext : DbContext
    {
        public PruebaEYContext()
        {
        }

        public PruebaEYContext(DbContextOptions<PruebaEYContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Proveedore> Proveedores { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost; Database=PruebaEY; Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proveedore>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CorreoElectronico)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("correo_electronico");

                entity.Property(e => e.DireccionFisica)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("direccion_fisica");

                entity.Property(e => e.FacturacionAnual)
                    .HasColumnType("numeric(20, 2)")
                    .HasColumnName("facturacion_anual");

                entity.Property(e => e.FechaEdicion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_edicion");

                entity.Property(e => e.IdentificacionTributaria)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("identificacion_tributaria")
                    .IsFixedLength();

                entity.Property(e => e.NombreComercial)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre_comercial");

                entity.Property(e => e.NumeroTelefonico)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("numero_telefonico");

                entity.Property(e => e.Pais)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("pais");

                entity.Property(e => e.RazonSocial)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("razon_social");

                entity.Property(e => e.SitioWeb)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("sitio_web");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Contrasena)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("contrasena");

                entity.Property(e => e.Correo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("correo");

                entity.Property(e => e.NombreCompleto)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("nombre_completo");

                entity.Property(e => e.NombreUsuario)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre_usuario");

                entity.Property(e => e.Rol)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("rol");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
