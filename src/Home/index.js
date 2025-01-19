import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css' // Import the CSS file

class Home extends Component {
  state = {
    users: [],
    searchTerm: '',
    sortOrder: 'A-Z',
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = async () => {
    this.setState({loading: true})
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (response.ok) {
        const data = await response.json()
        this.setState({users: data, loading: false})
      } else {
        throw new Error('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      this.setState({loading: false, error: true})
    }
  }

  handleSearchChange = event => {
    this.setState({searchTerm: event.target.value})
  }

  handleSortChange = event => {
    this.setState({sortOrder: event.target.value})
  }

  getSortedUsers = users => {
    const {sortOrder} = this.state
    return [...users].sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name)
      }
      return b.name.localeCompare(a.name)
    })
  }

  render() {
    const {users, searchTerm, sortOrder, loading, error} = this.state

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const sortedUsers = this.getSortedUsers(filteredUsers)

    if (loading) {
      return <p className="loading">Loading...</p>
    }

    if (error) {
      return (
        <p className="error">Error fetching users. Please try again later.</p>
      )
    }

    return (
      <div className="home">
        <h1>User List</h1>

        <div className="filter-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={this.handleSearchChange}
            className="search-input"
          />

          <div>
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={this.handleSortChange}
              className="sort-select"
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
        </div>

        <ul className="user-list">
          {sortedUsers.map(user => (
            <li key={user.id} className="user-item">
              <Link to={`/user/${user.id}`} className="user-link">
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>City: {user.address.city}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
