import React, { PureComponent } from 'react'
import { TextProps } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
 const IconsCategory = {
    AntDesign: 'AntDesign',
    Entypo: 'Entypo',
    EvilIcons: 'EvilIcons',
    Feather: 'Feather',
    FontAwesome: 'FontAwesome',
    FontAwesome5: 'FontAwesome5',
    Fontisto: 'Fontisto',
    Foundation: 'Foundation',
    Ionicons: 'Ionicons',
    MaterialIcons: 'MaterialIcons',
    MaterialCommunityIcons: 'MaterialCommunityIcons',
    Octicons: 'Octicons',
    Zocial: 'Zocial',
    SimpleLineIcons: 'SimpleLineIcons'
}
export interface IconProps extends TextProps {
    /**
  * Size of the icon, can also be passed as fontSize in the style object.
  *
  * @default 12
  */
    size?: number;

    /**
     * Name of the icon to show
     *
     * See Icon Explorer app
     * {@link https://github.com/oblador/react-native-vector-icons/tree/master/Examples/IconExplorer}
     */
    name: string;

    /**
     * Color of the icon
     *
     */
    color?: string;

    /**
     * Name of the icon set
     *
     */
    iconFamily?: 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Fontisto' | 'Foundation'
    | 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons' | 'Octicons' | 'Zocial' | 'SimpleLineIcons'
}
export default class CustomIcon extends PureComponent<IconProps>{
    constructor(props) {
        super(props)
    }

    render() {
        switch (this.props.iconFamily) {
            case IconsCategory.AntDesign:
                return (
                    <AntDesign
                        {...this.props}
                    />
                ); case IconsCategory.Entypo:
                return (
                    <Entypo
                        {...this.props}
                    />
                ); case IconsCategory.EvilIcons:
                return (
                    <EvilIcons
                        {...this.props}
                    />
                ); case IconsCategory.Feather:
                return (
                    <Feather
                        {...this.props}
                    />
                ); case IconsCategory.FontAwesome:
                return (
                    <FontAwesome
                        {...this.props}
                    />
                ); case IconsCategory.FontAwesome5:
                return (
                    <FontAwesome5
                        {...this.props}
                    />
                ); case IconsCategory.Fontisto:
                return (
                    <Fontisto
                        {...this.props}
                    />
                ); case IconsCategory.Foundation:
                return (
                    <Foundation
                        {...this.props}
                    />
                ); case IconsCategory.Ionicons:
                return (
                    <Ionicons
                        {...this.props}
                    />
                ); case IconsCategory.MaterialCommunityIcons:
                return (
                    <MaterialCommunityIcons
                        {...this.props}
                    />
                ); case IconsCategory.MaterialIcons:
                return (
                    <MaterialIcons
                        {...this.props}
                    />
                ); case IconsCategory.Octicons:
                return (
                    <Octicons
                        {...this.props}
                    />
                ); case IconsCategory.SimpleLineIcons:
                return (
                    <SimpleLineIcons
                        {...this.props}
                    />
                ); case IconsCategory.Zocial:
                return (
                    <Zocial
                        {...this.props}
                    />
                ); case IconsCategory.AntDesign:
            default:
                return null
        }
    }
}