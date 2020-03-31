import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import { NavLink } from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render 2 items if not logged in', () => {
        expect(wrapper.find(NavLink)).toHaveLength(2);
    });
    
    it('should render 3 items if logged in', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavLink)).toHaveLength(3);
    });
    
    it('should render 1 specific item if logged in', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavLink to="/logout">Log out</NavLink>)).toEqual(true);
    });
});
