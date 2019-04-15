import React from 'react';
import { getDemographics } from '../../utils.js'

class FamilyFriendly extends React.Component {

    // If above 0-4 is above 5% give tag 'Family Friendly'

    async isFamilyFriendly() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "AgeGroupOfPopulation");
        console.log("Here", suburbInfo.demographics[0]);
        var agesArray = suburbInfo.demographics[0].items;
        var arrayLength = agesArray.length;
        for (var i = 0; i < arrayLength; i++) {
            if (agesArray[i].label == "0 to 4") {
                const zeroToFour = agesArray[i].value;
                const total = suburbInfo.demographics[0].total;
                console.log(zeroToFour / total);
                if ((zeroToFour / total) > 0.05) {
                    console.log("inside", zeroToFour / total);
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default FamilyFriendly;
