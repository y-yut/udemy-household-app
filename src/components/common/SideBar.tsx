import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import React, { CSSProperties } from 'react'
import { NavLink } from 'react-router-dom';

interface SideBarProps {
	drawerWidth: number;
	mobileOpen: boolean;
	handleDrawerClose: () => void;
	handleDrawerTransitionEnd: () => void;
}

interface menuItem {
	text: string;
	path: string;
	icon: React.ComponentType;
}

const SideBar = ({ drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd }: SideBarProps) => {

	const menuItems: menuItem[] = [
		{ text: 'Home', path: '/', icon: HomeIcon },
		{ text: 'Report', path: '/report', icon: AssessmentIcon },
	];

	const baseLinkStype: CSSProperties = {
		textDecoration: "none",
		color: "inherit",
		display: "block",
	}

	const activeLinkStype: CSSProperties = {
		backgroundColor: "rgba(0, 0, 0, 0.08)",
	}

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{menuItems.map((item, index) => (
					<NavLink key={index} to={item.path} style={({isActive}) => {
						console.log("選択されたメニューは", item.text, isActive)
						return {
							...baseLinkStype,
							...(isActive ? activeLinkStype : {})
						}
					}}>
						<ListItem key={index} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<item.icon />
								</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					</NavLink>
				))}
			</List>
		</div>
	);
	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>

			{/* モバイル用 */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onTransitionEnd={handleDrawerTransitionEnd}
				onClose={handleDrawerClose}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				slotProps={{
					root: {
					keepMounted: true, // Better open performance on mobile.
					},
				}}
			>
			{drawer}
			</Drawer>

			{/* PC用 */}
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
				open
			>
			{drawer}
			</Drawer>
		</Box>
	)
}

export default SideBar