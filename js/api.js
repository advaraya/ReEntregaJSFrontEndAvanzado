const host = "https://beerflix-api.herokuapp.com";
const key = "PMY591M-NFEME38-MEK46BQ-XG7X2MD";

async function getBeers(search = "") {
  const params = { limit: 10 };
  let url = `${host}/api/v1/beers`;
  if (search !== undefined && search !== "") {
    params["search"] = search;
  }

  var queryString = Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");
  if (queryString !== "") {
    url = `${url}?${queryString}`;
  }

  return await apiRequest(url);
}

async function getBeerWithID(id) {
  return await apiRequest(`${host}/api/v1/beers/${id}`);
}

async function apiRequest(url) {
  try {
    const response = await axios.get(url, {
      headers: { "X-API-KEY": key },
    });
    if (response.status !== 200 || !response.data.success) {
      throw new Error("Error de peticion");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function sendCommentToBeer(id, comment) {
  try {
    const response = await axios.post(
      `${host}/api/v1/beers/${id}/comment`,
      { comment },
      {
        headers: { "X-API-KEY": key },
      }
    );
    if (!response.data.success) {
      throw new Error("Error de peticion");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
