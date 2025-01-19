import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class UserDetails extends Component {
  state = {
    user: null,
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.fetchUserDetails()
  }

  fetchUserDetails = async () => {
    const {
      match: {
        params: {id},
      },
    } = this.props
    this.setState({loading: true})
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({user: data, loading: false})
      } else {
        throw new Error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
      this.setState({loading: false, error: true})
    }
  }

  render() {
    const {user, loading, error} = this.state

    if (loading) {
      return <p className="loading">Loading user details...</p>
    }

    if (error) {
      return (
        <p className="error">
          Error fetching user details. Please try again later.
        </p>
      )
    }

    if (!user) {
      return null
    }

    const {
      name,
      username,
      email,
      phone,
      website,
      address: {suite, street, city, zipcode},
      company: {name: companyName, catchPhrase},
    } = user

    return (
      <div className="user-detail">
        <h1>User Details</h1>
        <div className="user-info">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Address:</strong> {suite}, {street}, {city}, {zipcode}
          </p>
          <p>
            <strong>Company:</strong> {companyName}
          </p>
          <p>
            <strong>Catchphrase:</strong> {catchPhrase}
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {website}
            </a>
          </p>
        </div>
        <Link to="/" className="back-button">
          Go Back
        </Link>
      </div>
    )
  }
}

export default UserDetails
