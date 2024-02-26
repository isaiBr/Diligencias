CREATE DATABASE PruebaEY;

use PruebaEY;

create table Proveedores(
	id INT PRIMARY KEY identity(1,1),
	razon_social varchar(100),
	nombre_comercial varchar(100),
	identificacion_tributaria char(11),
	numero_telefonico varchar(20),
	correo_electronico varchar(100),
	sitio_web varchar(250),
	direccion_fisica varchar(250),
	pais varchar(100),
	facturacion_anual numeric (20,2),
	fecha_edicion DATETIME
)

create table Usuarios(
	id int PRIMAry key IDENTITY(1,1),
	correo varchar(100),
	nombre_usuario varchar(100),
	contrasena varchar(250),
	nombre_completo varchar(250),
	rol varchar(100)
)

--delete from Proveedores
select * from Proveedores
select * from Usuarios

insert into usuarios (correo, nombre_usuario, contrasena, nombre_completo, rol) 
values ('pruebaey@gmail.com','UsuarioEY', '123', 'Isai Enrique Bravo Sierra','admin')