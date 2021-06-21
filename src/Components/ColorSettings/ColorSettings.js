import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { setBackgroundColor, setAdditionalTextColor, setMainColor, setMainTextColor } from '../../redux/config-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

const ColorSettings = () => {
  const dispatch = useDispatch();
  const mainColor = useSelector((state) => state.config?.mainColor, isEqual);
  const mainTextColor = useSelector((state) => state.config?.mainTextColor, isEqual);
  const backgroundColor = useSelector((state) => state.config?.backgroundColor, isEqual);
  const secondTextColor = useSelector((state) => state.config?.secondTextColor, isEqual);

  const styles = StyleSheet.create({
    settingsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10 },
    settingTitle: { textAlign: 'center', fontSize: 16, color: secondTextColor, opacity: 0.5 },
    settingTitleWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      minHeight: 70,
      padding: 10,
      backgroundColor: backgroundColor,
      borderRadius: 7,
      marginHorizontal: 7,

      borderWidth: 1,
      borderColor: secondTextColor,
    },
    active: { fontWeight: 'bold', opacity: 1 },
  });

  const settingTargetsSetters = {
    mainColor: setMainColor,
    mainTextColor: setMainTextColor,
    backgroundColor: setBackgroundColor,
    secondTextColor: setAdditionalTextColor,
  };
  const [selectedColor, setSelectedColor] = useState('');
  const [settingTarget, setSettingTarget] = useState('mainColor');

  useEffect(() => {
    switch (settingTarget) {
      case 'mainColor':
        setSelectedColor(mainColor);
        break;
      case 'mainTextColor':
        setSelectedColor(mainTextColor);
        break;
      case 'backgroundColor':
        setSelectedColor(backgroundColor);
        break;
      case 'secondTextColor':
        setSelectedColor(secondTextColor);
        break;
      default:
        break;
    }
  }, [mainColor, mainTextColor, backgroundColor, secondTextColor, setSelectedColor, settingTarget]);

  const changeColorHandler = useCallback(
    (color) => {
      const setter = settingTargetsSetters[`${settingTarget}`];
      console.log('setter = ', setter);
      dispatch(setter(color));
    },
    [settingTargetsSetters, dispatch, settingTarget]
  );

  return (
    <View>
      <View style={[styles.settingsRow, { marginTop: 20 }]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setSettingTarget('mainColor');
          }}
        >
          <View style={styles.settingTitleWrapper}>
            <Text style={[styles.settingTitle, settingTarget === 'mainColor' && styles.active]}>Акцентный цвет фона</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            setSettingTarget('mainTextColor');
          }}
        >
          <View style={styles.settingTitleWrapper}>
            <Text style={[styles.settingTitle, settingTarget === 'mainTextColor' && styles.active]}>Акцентный цвет текста</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={[styles.settingsRow, { marginBottom: 30 }]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setSettingTarget('backgroundColor');
          }}
        >
          <View style={styles.settingTitleWrapper}>
            <Text style={[styles.settingTitle, settingTarget === 'backgroundColor' && styles.active]}>Цвет фона</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            setSettingTarget('secondTextColor');
          }}
        >
          <View style={styles.settingTitleWrapper}>
            <Text style={[styles.settingTitle, settingTarget === 'secondTextColor' && styles.active]}>Цвет текста</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ColorPicker selectedColor={selectedColor} onSelect={(color) => changeColorHandler(color)} />
    </View>
  );
};

export default ColorSettings;
