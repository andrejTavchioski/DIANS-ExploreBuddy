import { useState } from 'react';
import { placesType } from '../../config/enums';
import {
    Wrapper,
    Title,
    ColumnChildWrapper,
    RowChildWrapper,
    Label,
    Input,
    DescInput,
    Text,
    SelectPlace,
    SelectOption,
    Button,
} from './styles';

const EditAddPlacesModal = ({ functionality, data, onCancel, onConfirm }) => {
    const [editedData, setEditedData] = useState({
        name: data?.name ?? '',
        lat: data?.lat ?? '',
        long: data?.long ?? '',
        desc: data?.desc ?? '',
        type: data?.type ?? placesType.SPRING,
    });
    const title = functionality === 'edit' ? 'Edit location' : 'Add location';
    const onInputChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <Wrapper>
            <Title>{title ?? ''}</Title>
            <ColumnChildWrapper>
                <Label htmlFor='name'>Name</Label>
                <Input
                    id='name'
                    name='name'
                    placeholder='Insert name here...'
                    value={editedData.name}
                    onChange={onInputChange}
                />
            </ColumnChildWrapper>
            <RowChildWrapper>
                <ColumnChildWrapper style={{ width: '46%' }}>
                    <Label htmlFor='long'>Long</Label>
                    <Input
                        id='long'
                        name='long'
                        value={editedData.long}
                        onChange={onInputChange}
                    />
                </ColumnChildWrapper>
                <ColumnChildWrapper style={{ width: '46%' }}>
                    <Label htmlFor='lat'>Lat</Label>
                    <Input
                        id='lat'
                        name='lat'
                        value={editedData.lat}
                        onChange={onInputChange}
                    />
                </ColumnChildWrapper>
            </RowChildWrapper>
            <ColumnChildWrapper>
                <Label htmlFor='desc'>Description</Label>
                <DescInput
                    id='desc'
                    name='desc'
                    placeholder='Insert description here...'
                    value={editedData.desc}
                    onChange={onInputChange}
                />
            </ColumnChildWrapper>
            <RowChildWrapper>
                <Text>Type</Text>
                <SelectPlace
                    name='type'
                    value={editedData.type}
                    onChange={onInputChange}
                >
                    {Object.keys(placesType)
                        .splice(1)
                        .map((k) => {
                            let s = placesType[k];
                            let con = s.slice(1);
                            s = s.charAt(0).toUpperCase();
                            return (
                                <SelectOption
                                    value={placesType[k]}
                                    key={placesType[k]}
                                >
                                    {s + con}
                                </SelectOption>
                            );
                        })}
                </SelectPlace>
            </RowChildWrapper>
            <RowChildWrapper style={{ marginTop: '30px' }}>
                <Button color='#E65356' onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    color='#329F76'
                    onClick={() =>
                        onConfirm({ data: editedData, id: data?.id })
                    }
                >
                    Confirm
                </Button>
            </RowChildWrapper>
        </Wrapper>
    );
};

export default EditAddPlacesModal;
