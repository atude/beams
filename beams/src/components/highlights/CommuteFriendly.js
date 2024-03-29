import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Train from '@material-ui/icons/Train';

class CommuteFriendly extends React.Component {
    state = {
        isCommuteFriendly: false
    };

    // If driving and walking is less than 55% of transport commute then Convenient Transport

    async isCommuteFriendly() {
        const suburbInfo = this.props.stats;
        var commuteArray = suburbInfo.demographics[10].items;
        var arrayLength = 3;
        if (commuteArray.length < 3) {
            return false;
        }
        const total = commuteArray[0].value + commuteArray[1].value + commuteArray[2].value;

        for (var i = 0; i < arrayLength; i++) {
            if (commuteArray[i].label === "Car (driver)") {
                break;
            }
        }
        if ((commuteArray[i].value / total) <= 0.55) {
            return true;
        } else {
            return false;
        }
    }

    async componentDidMount() {
        const result = await this.isCommuteFriendly();
        this.setState({
            isCommuteFriendly: result
        });
    }

    render() {
        if (this.state.isCommuteFriendly) {
            return (
                <Chip avatar={<Avatar><Train/></Avatar>} label="Commute Friendly" className="ChipsHighlight"
                color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default CommuteFriendly;
