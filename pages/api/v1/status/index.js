function status(request, response) {
  response.status(200).json({ chave: "teste éé" });
}

export default status;
