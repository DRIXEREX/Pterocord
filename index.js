const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require("mongoose");
const client = new Client({ intents: 3276799 });
const Logger = require('./utils/Logger');
const cfg = require('./config.json');

if(!cfg.token === "") return Logger.error("Il n'y a pas le token dans le fichier config.json !")
if(!cfg.database_uri === "") return Logger.error("Il n'y a pas l'URL de la base de données dans le fichier config.json !")
if(!cfg.panelURL === "") return Logger.error("Il n'y a pas l'URL du panel dans le fichier config.json !")

['commands', 'buttons', 'modals', 'selects', 'developers'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'ModalUtil', 'SelectUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
require('./utils/ErrorHandler')(client);

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}`) });
process.on('warning', (...args) => Logger.warn(...args));

module.exports = client;

mongoose.connect(cfg.database_uri, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.db("La connexion à la base de données a été faite avec succès !") })

client.color = "Blue";
client.footer = "©️ 2022 Pterocord, par DRIXEREX."

client.login(cfg.token);
