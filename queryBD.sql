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

--carga opcional de datos, no es necesario
-- No se llegó a implementar la logica completa para obtener el usuario logueado
insert into usuarios (correo, nombre_usuario, contrasena, nombre_completo, rol) 
values ('pruebaey@gmail.com','UsuarioEY', '123', 'Isai Enrique Bravo Sierra','admin')


-- Carga opcional de datos (se puede realizar desde la misma aplicación)
INSERT INTO Proveedores (razon_social, nombre_comercial, identificacion_tributaria, numero_telefonico,correo_electronico, sitio_web, direccion_fisica, pais, facturacion_anual, fecha_edicion) VALUES ('zeta limited', 'zeta limited', '98765432191', '934869864','prov1@gmail.com','https://www.ey.com/es_pe','Av  Victor Andres Belaunde 171','Peru',100000.00, '2024-02-28T06:14:27.017')
INSERT INTO Proveedores (razon_social, nombre_comercial, identificacion_tributaria, numero_telefonico,correo_electronico, sitio_web, direccion_fisica, pais, facturacion_anual, fecha_edicion) VALUES ('batiste unlimited', 'batiste unlimited', '76543219198', '934869865','prov2@gmail.com','https://www.ey.com/es_pe','Av  Victor Andres Belaunde 171','Peru',200000.00, '2024-02-27T06:14:27.017')
INSERT INTO Proveedores (razon_social, nombre_comercial, identificacion_tributaria, numero_telefonico,correo_electronico, sitio_web, direccion_fisica, pais, facturacion_anual, fecha_edicion) VALUES ('korea legal', 'korea legal', '43219198765', '934869866','prov3@gmail.com','https://www.ey.com/es_pe','Av  Victor Andres Belaunde 171','Peru',300000.00, '2024-02-26T06:14:27.017')
INSERT INTO Proveedores (razon_social, nombre_comercial, identificacion_tributaria, numero_telefonico,correo_electronico, sitio_web, direccion_fisica, pais, facturacion_anual, fecha_edicion) VALUES ('dorado asset', 'dorado asset', '87654321919', '934869867','prov4@gmail.com','https://www.ey.com/es_pe','Av  Victor Andres Belaunde 171','Peru',400000.00, '2024-02-25T06:14:27.017')
INSERT INTO Proveedores (razon_social, nombre_comercial, identificacion_tributaria, numero_telefonico,correo_electronico, sitio_web, direccion_fisica, pais, facturacion_anual, fecha_edicion) VALUES ('GSJ LIMITED', 'GSJ LIMITED', '19198765432', '934869868','prov5@gmail.com','https://www.ey.com/es_pe','Av  Victor Andres Belaunde 171','Peru',500000.00, '2024-02-24T06:14:27.017')
INSERT INTO Proveedores (razon_social, nombre_comercial, identificacion_tributaria, numero_telefonico,correo_electronico, sitio_web, direccion_fisica, pais, facturacion_anual, fecha_edicion) VALUES ('scho limited', 'scho limited', '91987654321', '934869869','prov6@gmail.com','https://www.ey.com/es_pe','Av  Victor Andres Belaunde 171','Peru',600000.00, '2024-02-23T06:14:27.017')