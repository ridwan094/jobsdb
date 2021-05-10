import axios from 'axios';

const list = async () => {
    try {
        let response = await axios.get(`/api/company`)
        return await response.data
    } catch (err) {
        return await err.message
    }


}


const create = async (company) => {
    await axios.post(`/api/company`, company).then(response => { return response })
        .catch(error => { return error.message })
}

const findOne = async (data) => {
    const comp_id = parseInt(data);
    try {
        let response = await axios.get(`/api/company/${comp_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const update = async (company) => {
    const comp_id = parseInt(company.comp_id);
    try {
        let response = await axios.put(`/api/company/${comp_id}`,
        company)
      return await response.data
    } catch(err) {
        return await err.message
    } 
  }

const remove = async (data) => {
    try {
        let response = await axios.delete(`/api/company/${data}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

export default { list, create,remove,findOne,update}