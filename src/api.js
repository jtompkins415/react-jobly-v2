import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  
  /** Get Current User */

  static async getCurrUser(username){
    let res = await this.request(`users/details/${username}`)
    return res
  }

  /** Get all companies listed */

  static async getCompanies(name){
    let res = await this.request("companies", {name})
    return res.companies
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all Job listed */
  static async getJobs(title){
    let res = await this.request(`jobs`, {title});
    return res.jobs;
  }


  /** Get login token from username and password */

  static async userLogin(data) {
    let res = await this.request(`auth/token`, data, 'post')
    console.log(res)
    localStorage.setItem('token', res.token)
    return res.token
  }

  /** Sign up user and return authentication token */
  static async userSignup(data){
    let res = await this.request('auth/register', data, 'post');
    console.log(res.token)
    localStorage.setItem('token', res.token)
    return res
  }


  /** Delete user and return confirmation message */
  static async userDelete(username){
    let res = await this.request(`user/${username}`, {}, 'delete')

    return res.deleted
  }

  /** Update user
   * 
   * return user object
   */
  static async userUpdate(username, data){
    let res = await this.request(`users/${username}`, data, 'patch')
    console.log(res)
    return res
  }

  static async applyToJob(username, id){
    console.log(username)
    await this.request(`users/${username}/jobs/${id}`, {}, 'post')
  }  
}
// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;