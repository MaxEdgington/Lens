import { useState, useContext } from "react"
import { AppBar, Box, Toolbar, Typography, Menu, Container, Button, Tooltip, MenuItem } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import { useNavigate } from "react-router-dom"

import { userContext } from "../providers/UserProvider"

const pages = ["New Project"]
// const settings = ['My Projects', 'Logout'];

function Header() {
  const { logOut, loggedinUser } = useContext(userContext)
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    logOut()
  }
  const handleMyProjects = () => {
    navigate(`/login`)
    handleCloseUserMenu()
  }

  return (
    <AppBar position="fixed" top="0" style={{ zIndex: 100 }}>
      {/* <AppBar position="static"> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ background: "secondary" }}>
          <img src={"/white-lens.png"} onClick={() => navigate("/")} width="40px" style={{ marginRight: "8px" }} />

          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 100,
              letterSpacing: ".3px",
              color: "inherit",
              textDecoration: "none",
            }}
            style={{
              fontSize: "1.2rem",
            }}
          >
            Lens
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" href="StartNewProject">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Lens
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                style={{ fontWeight: 500, letterSpacing: "2px" }}
                onClick={() => navigate("/newProject")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon color="action" sx={{ color: "white", width: "40px", height: "40px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
              {loggedinUser ? (
                <div>
                  <MenuItem key={"My Projects"} onClick={handleMyProjects}>
                    <Typography textAlign="center">My Projects</Typography>
                  </MenuItem>
                  <MenuItem key={"Logout"} onClick={handleLogout}>
                    <Typography textAlign="center">LogOut</Typography>
                  </MenuItem>
                </div>
              ) : (
                <MenuItem key={"Sign In"} onClick={() => navigate("/login")}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
