import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GlassCard from './GlassCard';
import GroupButton from './GroupButton';
import ProfilePic from './ProfilePic';

const ProfileListCard = ({
  style,
  members = [],
  showButton,
  clickable,
  selectable,
  title,
  type,
  onPress, // for clickable card
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const TouchableWrapper = clickable ? TouchableOpacity : View;

  const dynamicStyle = {
    profileListContainer: {
      height: title ? '80%' : '100%',
    },
  };

  return (
    <GlassCard style={[styles.glassCard, style]}>
      <View style={styles.wrapper}>
        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        <View style={[styles.profileListContainer, dynamicStyle.profileListContainer]}>
          <ScrollView
            nestedScrollEnabled={true}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            <TouchableWrapper
        style={styles.container}
        onPress={clickable ? onPress : undefined}
        activeOpacity={0.8}
      >
            <View style={styles.profileList}>
              {members.map((member) => (
                <ProfilePic
                  key={member.id}
                  size={50}
                  imageURL={member.imageURL}
                  selectable={!!selectable}
                  selected={selectable && selectedIds.includes(member.id)}
                  onPress={
                    selectable ? () => handleSelect(member.id) : undefined
                  }
                />
              ))}
            </View>
            </TouchableWrapper>
          </ScrollView>
        </View>
        {showButton && <GroupButton style={styles.profileListButton} size={40} />}
        </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '100%',
        height: 200,
    }, 
    wrapper: {
        height: '100%',
        width: '100%',
        marginBottom: 40,
    },
        titleContainer: {
            width: '100%',
            paddingVertical: 20,
            backgroundColor: 'red',
        },
        title: {
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#6E6E6E',
            backgroundColor: 'blue',
        },
        container: {
          width: '100%',
          height: '100%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          },
        profileListButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        profileListContainer: {
            width: '100%',
         
        },
        scrollView: {
            height: '100%',
        },
        scrollViewContent: {
            justifyContent: 'center',
    
        },
        profileList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 10,
            paddingBottom: 40,
            gap: 15,
            justifyContent: 'center',
        },
        });

export default ProfileListCard;