import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import QuickSearch from '../QuickSearch.js'
import { Grid, Typography, Divider } from '@material-ui/core'
import mTerrain from '../../assets/ic_terrain.png'
import mTerrain1 from '../../assets/ic_terrain_1.png'
import mTerrain2 from '../../assets/ic_terrain_2.png'
import Highlights from '../Highlights.js'

class WrapperHeader extends React.Component {
    render() {
      const suburbs = this.props.suburbs;
      const onSuburbCompare = this.props.onSuburbCompare;
      const isCompare = this.props.isCompare;
      return (
      <div>
          {!isCompare ? 
            <img src={mTerrain} className="IconMain" alt="terrain"/>
            :
            <img src={mTerrain1} className="IconMain" alt="terrain"/>
          }
          <Typography align="left" inline className="MainText" 
          style={{ fontSize: 34 }} variant="overline" color="inherit">
            {`${suburbs[0].suburb}, ${suburbs[0].suburb_state}`}
          </Typography>
          {!isCompare ? 
            <div className="CompareSearchContainer">
              <QuickSearch suburb={suburbs[0].suburb} isSuburbPage={true} onSelect={onSuburbCompare}/>
            </div>
            : 
            <div className="HeadingR">
              <Typography align="right" inline className="MainTextR" 
              style={{ fontSize: 34 }} variant="overline" color="inherit">
                {`${suburbs[1].suburb}, ${suburbs[1].suburb_state}`}
              </Typography>
              <img src={mTerrain2} className="IconMainR" alt="terrain"/>
            </div>
            }
          
          <Grid container spacing={24} direction="row" justify="space-around" alignItems="center">
            <Grid item>
              <Highlights suburb={suburbs[0].suburb} suburb_state={suburbs[0].suburb_state} 
                key={suburbs[0].suburb+suburbs[0].suburb_state+'Highlights'}/>
            </Grid>
            
            <Grid item>
              {/* Radar chart? */}
            </Grid>

            {isCompare && 
              <Grid item>
                <Highlights suburb={suburbs[1].suburb} suburb_state={suburbs[1].suburb_state} 
                key={suburbs[1].suburb+suburbs[1].suburb_state+'Highlights'} isCompare={true}/>
              </Grid>
            }

          </Grid>

          <br></br>
          <Divider variant="fullWidth"/>
          <br></br>
      </div>
      );
    }
}

export default WrapperHeader;
