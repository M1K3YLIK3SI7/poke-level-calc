import React, { Component } from 'react'
import './calc.css';

import Input from "./Input";
import Result from "./Result";
import Visualization from './Visualization';

import levelXp, {totalXp} from './levels';
var MAX_LEVEL = levelXp.length;

function calcStats(xp) {
    if (xp === '?') {
        return {
            level : '?',
            xpLeft : '?????',
            xpGoal : 200000
        };
    }
    var level = 0;
    var xpLeft = xp;
    while (level < MAX_LEVEL && xpLeft - levelXp[level] >= 0) {
        xpLeft -= levelXp[level];
        level++;
    }
    if (level === 40) {
        xpLeft = levelXp[levelXp.length-1]
    }
    return {
        level : level,
        xpLeft : xpLeft,
        xpGoal : levelXp[level] || levelXp[levelXp.length-1]
    };
}

export default class Header extends Component {

    render() {

        var stats = calcStats(this.props.xp);

        var perc = stats.xpLeft / stats.xpGoal;
        var progressStyle = {
            width : (100*perc) + '%'
        };
        var totalPerc = Math.min(1, this.props.xp / totalXp);

        var validData = totalPerc >= 0 && this.props.date !== null
            && this.props.date < (new Date());

        var resultComponents = (<div className="rollDown">
            <div className="line"></div>
            ENTER XP AND START DATE<br />
            TO SEE YOUR RESULTS
        </div>);
        if (validData) {
            resultComponents = (<div className="rollDown opened">
                <div className="line"></div>
                <Result startDate={this.props.date} xp={this.props.xp} />
                <Visualization perc={totalPerc} />
            </div>);
        }

        var disabledStyle = this.props.xp === '?' ? ' disabled' : '';

        return (
            <div className="calc">
                <h1>POKEMON GO<br/>LEVEL SPEED CALCULATOR</h1>
                <div className="xp">
                    <div className="fakeInput" onClick={()=>{this.input1.focus();}}>
                        <Input value={this.props.xp} className="inputXp" ref={(c) => {this.input1 = c}}
                            onChange={(evt) => this.props.setXp(evt.target.value)}
                        /> XP
                    </div>
                </div>
                <div className={"level"+disabledStyle}>
                    Level {stats.level}
                </div>
                <div className={"progress"+disabledStyle}>
                    <div className="progressBg"></div>
                    <div className="progressFront" style={progressStyle}><div className="progressHandle"></div></div>
                    <div className="progressXp">{stats.xpLeft} / {stats.xpGoal} XP</div>
                </div>
                <div className="bottom">
                    <div className="startDate">
                        START DATE:<br />
                        <div className="fakeInput" onClick={()=>{this.input2.focus();}}>
                            <Input value={this.props.dateStr} className="inputDate" ref={(c) => {this.input2 = c}}
                                   onChange={(evt) => this.props.setStartDate(evt.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {resultComponents}
            </div>
        );
    }
}
/*
 <ContentEditable
 tagName="span"
 html="as"
 disabled={false}
 onChange={(evt) => this.props.setXp(evt.target.value)}
 /> XP*/