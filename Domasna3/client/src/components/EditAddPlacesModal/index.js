import { useState, useEffect } from 'react';
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

const EditAddPlacesModal = ({
    functionality,
    data,
    onCancel,
    onConfirm,
    onDelete,
}) => {
    const [editedData, setEditedData] = useState({
        name: data?.name ?? '',
        lat: data?.lat ?? '',
        lon: data?.lon ?? '',
        description: data?.description ?? '',
        type: data?.type ?? placesType.SPRING,
    });
    const title = functionality === 'edit' ? 'Edit location' : 'Add location';
    const onInputChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        function callback(e) {
            if (e.key === 'Enter') {
                document.getElementById('onConfirm').click();
            }
        }
        window.addEventListener('keypress', callback);
        return () => {
            window.removeEventListener('keypress', callback);
        };
    });

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
                    <Label htmlFor='lon'>Long</Label>
                    <Input
                        id='lon'
                        name='lon'
                        value={editedData.lon}
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
                <Label htmlFor='description'>Description</Label>
                <DescInput
                    id='description'
                    name='description'
                    placeholder='Insert description here...'
                    value={editedData.description}
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
            <div style={{ marginTop: '10px' }} />
            {functionality === 'edit' && (
                <RowChildWrapper>
                    <Button
                        color='#8b0000 '
                        id='onDelete'
                        style={{ margin: 'auto' }}
                        onClick={() => onDelete({ id: data?.id })}
                    >
                        Delete
                    </Button>
                </RowChildWrapper>
            )}
            <RowChildWrapper>
                <Button color='#E65356' onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    color='#329F76'
                    id='onConfirm'
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
