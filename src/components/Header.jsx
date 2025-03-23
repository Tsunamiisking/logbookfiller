"use client"

import { useState, useRef, useEffect } from "react"
import { FaUserCircle, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa"

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <h2>Log Book filler </h2>
        </div>
        <div className="profile-container" ref={dropdownRef}>
          <FaUserCircle size={32} onClick={toggleDropdown} className="profile-icon" />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={toggleModal}>
                <FaUser className="dropdown-icon" />
                <span>Profile</span>
              </div>
              <div className="dropdown-item">
                <FaCog className="dropdown-icon" />
                <span>Settings</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">
                <FaSignOutAlt className="dropdown-icon" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>User Profile</h2>
              <button className="close-button" onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="profile-info">
                <div className="profile-avatar">
                  <FaUserCircle size={80} />
                </div>
                <h3>John Doe</h3>
                <p>john.doe@example.com</p>

                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-label">Member since</span>
                    <span className="detail-value">Jan 2023</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Role</span>
                    <span className="detail-value">Administrator</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Last login</span>
                    <span className="detail-value">Today at 12:45 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

