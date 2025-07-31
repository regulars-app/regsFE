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
  scrollEnabled = true,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const TouchableWrapper = clickable ? TouchableOpacity : View;

  const profilePicSize = 50

  const dynamicStyles = {
    scrollView: {
      height: title ? style.height - 80 : style.height - 10, 
      marginRight: showButton ? 40 : 0,
    },
  };

  return (
    <GlassCard style={[styles.glassCard, style]}>
        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
 
          <ScrollView
            nestedScrollEnabled={true}
            scrollEnabled={scrollEnabled}
            style={[styles.scrollView, dynamicStyles.scrollView]}
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
                  size={profilePicSize}
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
     
        {showButton && <GroupButton style={styles.profileListButton} size={40} />}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
    glassCard: {
        width: '100%',
        height: 200,
    }, 
        titleContainer: {
            width: '100%',
            paddingVertical: 20,
        },
        title: {
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#6E6E6E',
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
            flex: 1,
            paddingHorizontal: 10,
        },
        scrollView: {
          
        },
        scrollViewContent: {
            justifyContent: 'center',
            paddingBottom: 20,
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