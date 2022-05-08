import React, { useEffect, useState } from "react";
import axios from "axios";
import Client from "./Client";

const Recherche = () => {
	const [clients, setClients] = useState([]);
	const [rechercheClients, setRechercheClients] = useState([]);
	const [tri, setTri] = useState(null);

	useEffect(() => {
		axios.get(`http://localhost:4000/clients`).then((res) => {
			setClients(res.data);
			setRechercheClients(res.data);
		}).catch(err => {
			console.log(err);
		});
	}, []);

	const chercher = (e) => {
		const rech = e.target.value;
		if (rech !== '') {
			const rtRecherche = clients.filter((client) => {
				return client.societe.toLowerCase().startsWith(rech.toLowerCase());
			})
			console.log(rtRecherche);
			setRechercheClients(rtRecherche);
		}
		else {
			setRechercheClients(clients);
		}
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
			<div className="container">
				<div className="row">
					<form>
						<div className="form-group mb-2 col-md-4 offset-md-4 d-flex justify-content-between">
							<input type="text" className="form-control" id="societe" onChange={chercher} />
							<input type="submit" className="btn btn-primary" value="recherche" />
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
