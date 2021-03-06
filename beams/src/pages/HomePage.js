import React from 'react';
import './HomePage.css'
import { Grid, Typography, Grow, Fab, Slide, FormGroup, ClickAwayListener, FormControlLabel, Checkbox, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import {Link} from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeSearch from '../components/HomeSearch';
import PeopleIcon from '@material-ui/icons/People';
import { MapSearch, Home } from 'mdi-material-ui'
import mDomain from '../assets/domain.png'
import bg from '../assets/bg.png'

class HomePage extends React.Component {
  state = {
    prioritiesA: false,  
    prioritiesB: false,
    prioritiesC: false,
    prioritiesD: false,
    expandColor: 'white',
    expanded: false,
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handlePanel = panel => (event, expanded) => {
    this.setState({
      expandColor: expanded ? 'black' : 'white',
      expanded: expanded ? panel : false,
    });
  }

  handleClickAway = () => {
    this.setState({
      expanded: false,
      expandColor: 'white',
    });
  };

  render() {
    var { prioritiesA, prioritiesB, prioritiesC, prioritiesD, expandColor } = this.state;    
    var priorities = [];
    priorities['Socioeconomic Status'] = prioritiesA;
    priorities['Affordability'] = prioritiesB;
    priorities['Education Quality'] = prioritiesC;
    priorities['Safety'] = prioritiesD;

    return (
      
      <div className='HomeContainer'>
      <img src={bg} className="bg" alt="bg"/>
      <Grow in timeout={750}>
      <Grid container direction="column" justify="space-evenly" alignItems="center">
        <Grid item>
        <Typography style={{ fontSize: 30 }} variant='overline' align='center'>
          All your suburb data in one place. Made simple.
        </Typography>
        <br></br>
        </Grid>
        <Grid item>
          <HomeSearch onStartOver={this.props.onStartOver} priorities={priorities} onSelect={(city, priorities) => this.props.onSelect(city, priorities)}/>
          <ClickAwayListener onClickAway={this.handleClickAway}>
          <ExpansionPanel expanded={this.state.expanded} onChange={this.handlePanel(true)} style={{backgroundColor: 'transparent'}} className="AdvPanel">
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{color: expandColor}}/>}>
              <MapSearch  style={{color: expandColor}} className="AdvSearchIcon"/>
              <Typography style={{paddingTop: "2px", color: expandColor}} variant="button">Priorities</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={prioritiesA} style={{color: '#E62927'}}
              onChange={this.handleChange('prioritiesA')} value="prioritiesA"/>} label="Socioeconomic Status"/>
              <FormControlLabel control={<Checkbox checked={prioritiesB} style={{color: '#E62927'}}
              onChange={this.handleChange('prioritiesB')} value="prioritiesB"/>} label="Affordability"/>
              <FormControlLabel control={<Checkbox checked={prioritiesC} style={{color: '#E62927'}}
              onChange={this.handleChange('prioritiesC')} value="prioritiesC"/>} label="Education Quality"/>
              <FormControlLabel control={<Checkbox checked={prioritiesD} style={{color: '#E62927'}}
              onChange={this.handleChange('prioritiesD')} value="prioritiesD"/>} label="Safety"/>
            </FormGroup>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </ClickAwayListener>
        </Grid>
      </Grid>
      </Grow>
      <Slide in timeout={1000} direction="up">
      <div className="Footer">
      <a href="https://www.domain.com.au/" target="_blank" rel="noopener noreferrer">
        <Fab variant="extended"
        size="medium" className="FooterL"
        style={{ backgroundColor: "transparent", boxShadow: 'none', width: "250px"}}>
        <Home style={{paddingRight: "10px"}}/>
          <Typography variant="button" style={{fontSize: "16px"}}>Powered by </Typography>
          <img src={mDomain} width={2886*0.02} height={652*0.02} alt="domain"
                style={{paddingLeft: "6px", paddingBottom: "1px"}}/>
        </Fab>
        </a>
        <Link to="/developers">
        <Fab variant="extended"
        size="medium" className="FooterR"
        style={{ backgroundColor: "transparent", boxShadow: 'none'}} >
          <PeopleIcon style={{paddingRight: "10px"}}/>
          <Typography variant="button" style={{fontSize: "16px"}}>Beams &copy; 2019</Typography>
        </Fab>
        </Link>
        <div style={{clear: "both"}}/>
      </div>
      </Slide>
      </div>
    );
  }
}

export default HomePage;
