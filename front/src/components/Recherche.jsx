import React, { useEffect, useState } from "react";
import axios from "axios";
import Client from "./Client";

const Recherche = () => {
	const [clients, setClients] = useState([]);
	const [rechercheClients, setRechercheClients] = useState([]);
	const [tri, setTri] = useState(null);

	const [societe, setSociete] = useState('');
	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');


	useEffect(() => {
		axios.get(`http://localhost:4000/clients`).then((res) => {
			setClients(res.data);
			setRechercheClients(res.data);
		}).catch(err => {
			console.log(err);
		});
	}, []);

	const chercher = (e) => {
		e.preventDefault();
		if (societe !== '' || nom !== '' || prenom !== '') {
			const rtRecherche = clients.filter((client) => {
				return client.societe.toLowerCase().startsWith(societe.toLowerCase()) && client.prenom.toLowerCase().startsWith(prenom.toLowerCase()) && client.nom.toLowerCase().startsWith(nom.toLowerCase());
			});
			setRechercheClients(rtRecherche);
		}
		else {
			setRechercheClients(clients);
		}

	}

	const changerRecherche = (e) => {
		if (e.target.getAttribute("id") === "societe") {
			setSociete(e.target.value);
			}
		if (e.target.getAttribute("id") === "prenom") {
			setPrenom(e.target.value);
		}
		if (e.target.getAttribute("id") === "nom") {
			setNom(e.target.value);
		}
		if (societe === '' && nom === '' && prenom === '') {
			setRechercheClients(clients);
		}
		chercher();
	}


	const typeTri = (e) => {
		setTri(e.target.getAttribute("value"));
	}

	const triTab = (a, b) => {
		if (tri === "top") { return b.ca - a.ca; }
		else if (tri === "down") {
			return a.ca - b.ca;
		}
	}


	return (
		<div>
			<div className="container mt-5">
				<div className="row">
					<form>
						<div className="form-group mb-2 col-md-4 offset-md-4 d-flex justify-content-between">
							<input type="text" className="form-control" placeholder="Société" id="societe" onChange={changerRecherche} />
							<input type="text" className="form-control" placeholder="Prénom" id="prenom" onChange={changerRecherche} />
							<input type="text" className="form-control" placeholder="Nom" id="nom" onChange={changerRecherche} />
							<input type="submit" className="btn btn-primary" value="recherche" onClick={chercher} />
						</div>
					</form>
				</div>
				<div className="row">
					<div className="top" id="top" value="top" onClick={typeTri}>
						Top
					</div>
					<div className="down" id="down" value="down" onClick={typeTri}>
						Down
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					{rechercheClients.length === 0 ? <h1>aucun client trouvé</h1> :
						rechercheClients
							.sort(triTab)
							.map((client) => {
								return (
									<Client key={client.id} client={client} />
								);
							})}
				</div>
			</div>
		</div>
	);
};

export default Recherche;
