import axios from 'axios'

const serverURL = ''

class DataService extends Component {

    static getSomething() {
        return axios.get(`${serverURL}/api/v1/something`)
    }

}

export default DataService
