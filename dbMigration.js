const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { credentials, credentials2 } = require('./config');
const hashpassword = require("./utiliti")

const CreateDB = async() => {
    const pool = new Pool(credentials);
    await pool.query('CREATE DATABASE project');
    await pool.end();
};

const CreateTables = async() => {
    const pool = new Pool(credentials2);
    const query = (text, params, callback) => pool.query(text, params, callback);
    await query(
        `
	do $$
	begin
	 CREATE TABLE public.User
	   (
		UserID serial NOT NULL,
		name text NOT NULL,
		email text UNIQUE NOT NULL,
		role text NOT NULL,
		password text NOT NULL,
		PRIMARY KEY (UserID)
		);
		end
		$$
		`
    );

    await query(
        `
	do $$
	begin
	CREATE TABLE public.equipment
	(
	"EquipmentID" serial NOT NULL,
	name text NOT NULL,
	email text ,
	PRIMARY KEY ("EquipmentID"),
	CONSTRAINT email FOREIGN KEY (email)
	    REFERENCES public."user" (email) MATCH SIMPLE
	    ON UPDATE CASCADE
	    ON DELETE RESTRICT
	);
		end
		$$
		`
    );
    await query(
        `
	do $$
	begin
	CREATE TABLE public.Ticket
	(
	"TicketID" serial NOT NULL,
	title text NOT NULL,
	body text NOT NULL,
	"createTime" bigint NOT NULL,
	state text NOT NULL,
	creator text NOT NULL,
	assignedto text,
	"EquipmentID" int ,
	PRIMARY KEY ("TicketID"),
	CONSTRAINT "EquipmentID" FOREIGN KEY ("EquipmentID")
	    REFERENCES public.equipment ("EquipmentID") MATCH SIMPLE
	    ON UPDATE CASCADE
	    ON DELETE RESTRICT
	);
		end
		$$
		`
    );

    await query(
        `
	do $$
	begin
	CREATE TABLE public.Comment
	(

	CommentID serial NOT NULL,
	body text NOT NULL,
	createTime bigint NOT NULL,
	creator text NOT NULL,
	"TicketID" int NOT NULL,
	PRIMARY KEY (CommentID),
	CONSTRAINT "TicketID" FOREIGN KEY ("TicketID")
	    REFERENCES public.Ticket ("TicketID") MATCH SIMPLE
	    ON UPDATE CASCADE
	    ON DELETE RESTRICT
	);
		end
		$$
		`
    );
    let name = 'Admin';
    let email = 'Admin@example.com';
    let role = 'Admin';

    let password = hashpassword("123");

    await query(`INSERT INTO public.User(name,email,role,password) VALUES($1,$2,$3,$4);`, [
        name,
        email,
        role,
        password
    ]);

    await pool.end();
};

(async() => {
    await CreateDB();
    await CreateTables();
})();