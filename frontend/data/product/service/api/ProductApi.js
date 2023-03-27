const API_URL = "http://localhost:8080/"

function checkStatus(response) {
  if(response.ok) {
    return response
  }
  var error = new Error();
  error.response = response
  return error;
}


export const addProduct = data => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().user.token;
    if(token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    let body = JSON.stringify(data);
    return fetch(API_URL + "api/product/", { headers, method: "POST", body })
      .then(res => {
        if(res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        }else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if(res.status === 201) {
          return dispatch({type: 'ADD_PRODUCT', product: res.data })
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      })
  }
}


export const updateProduct = (id, data) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};

    let { token } = getState().user.token;

    if(token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    let body = JSON.stringify(data);
    let productId = getState().product[id].id;

    return fetch(API_URL + `/api/product/${productId}`, { headers, method: "PUT", body })
      .then(res => {
        if(res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
       .then(res => {
         if(res.status === 200) {
           return dispatch({ type: 'UPDATE_PRODUCT', product: res.data,  id});
         } else if(res.status === 401 || res.status === 403) {
           dispatch({type: 'AUTHENTICATION_ERROR', data: res.data });
           throw res.data;
         }
       })
  }
}


export const deleteProduct = (id) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let { token } = getState().user.token;
    if(token !== null) {
      headers["Authorization"] = `Bearer ${token}`
    }

    let productId = getState().product[id].id;

    return fetch(API_URL + `/api/product/${productId}`, { headers, method: "DELETE" })
      .then(res => {
        if(res.status === 204) {
          return { status: res.status, data: { } };
        } else if(res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      }).then(res => {
        if(res.status === 204) {
          return dispatch({ type: 'DELETE_PRODUCT', id });
        } else if(res.status === 401 || res.status === 403) {
          dispatch({type: 'AUTHENTICATION_ERROR', data: res.data });
          throw res.data;
        }
      })
  }
}


export const fetchProducts = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"}
    let token = getState().user.token;
    if(token !== null) {
      headers["Authorization"] = `Bearer ${token}`
    }

    return fetch(API_URL + "/api/product/", { headers, })
      .then(res => {
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      }).then(res => {
        if(res.status === 200) {
          return dispatch({ type: 'FETCH_PRODUCTS', products: res.data });
        } else if(res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      })
  }
}
