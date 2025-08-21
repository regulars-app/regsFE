import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GlassCard from './GlassCard';
import MembersView from './MembersView';

const SelectMembersView = ({height, members, style, title, onToggleMember, selectedMembers = []}) => {

    return (
        <MembersView 
            height={height}
            members={members}
            style={style}
            title={title}
            selectable={true}
            onToggleMember={onToggleMember}
            selectedMembers={selectedMembers}
        />
    );
};

export default SelectMembersView;