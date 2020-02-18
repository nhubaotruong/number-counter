import React from 'react';
import './MainBox.scss';
import * as R from 'ramda';
import { FixedSizeList as List } from 'react-window';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import ExportToExcel from './Excel.jsx';

const MainBox = () => {
    const usePersistedState = (key, defaultValue) => {
        const [state, setState] = React.useState(
            () => JSON.parse(localStorage.getItem(key)) || defaultValue
        );
        React.useEffect(() => {
            localStorage.setItem(key, JSON.stringify(state));
        }, [key, state]);
        return [state, setState];
    }
    const [inputLst, setInputLst] = usePersistedState('input', []);
    const [countLst, setCountLst] = usePersistedState('count', []);
    const inputForm = React.useRef();

    React.useEffect(() => {
        const counter = (uniqLst, oriLst) => {
            let tempLst = [];
            R.forEach(value => tempLst.push(R.assoc(value, R.length(R.filter(oriValue => value === oriValue, oriLst)), {})), uniqLst);
            setCountLst(tempLst);
        }
        counter(R.uniq(R.flatten(inputLst)), R.flatten(inputLst))
    }, [inputLst, setCountLst, setInputLst])


    const addInput = event => {
        event.preventDefault();
        let tempLst = [];
        for (let i = 1; i < 21; i++) {
            tempLst.push(event.target[`num${i}`].value);
        }
        let newLst = R.append(tempLst, inputLst);
        setInputLst(newLst);
        inputForm.current.reset();
    }

    const confirm = (title, text, icon, func) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            showConfirmButton: true,
            focusConfirm: false
        }).then(result => {
            if (result.value) {
                func();
                Swal.fire({
                    title: 'Thành công',
                    icon: 'success'
                });
            }
        })
    }


    const deleteAll = (event) => {
        event.preventDefault();
        confirm('Xoá mọi dữ liệu', 'Bạn có muốn xoá mọi dữ liệu?', 'warning', () => {
            setCountLst([]);
            setInputLst([]);
        })
    }

    const Row = ({ index, style }) => (
        <div style={style} className="d-flex align-items-center">
            <button className="btn btn-link" onClick={() => openModal(index)}><b><u>{index + 1}:</u> </b></button>
            {R.map(element => element + ', ', inputLst[index])}
        </div>

    );

    const countRow = ({ index, style }) => (
        <div style={style}>
            <b><u>{R.keys(countLst[index])[0]}:</u> </b>
            {R.values(countLst[index])[0]} lần
        </div>
    );

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: '50px 50px 30px 50px'
        }
    };

    Modal.setAppElement('#root');

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(null);

    const openModal = (index) => {
        setModalData(inputLst[index]);
        setCurrentIndex(index);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalData([]);
        setCurrentIndex(null);
        setModalIsOpen(false);
    }

    const modalFormSubmit = event => {
        event.preventDefault();
        let tempLst = [];
        for (let i = 1; i < 21; i++) {
            tempLst.push(event.target[`fix${i}`].value);
        }
        confirm('Sửa dữ liệu', 'Bạn có muốn sửa dữ liệu?', 'question', () => {
            setInputLst(R.update(currentIndex, tempLst, inputLst));
            closeModal();
        });
    }

    const clearRow = event => {
        event.preventDefault();
        confirm('Xoá hàng dữ liệu', 'Bạn có muốn xoá hàng dữ liệu này?', 'warning', () => {
            setInputLst(R.remove(currentIndex, 1, inputLst));
            closeModal();
        });
    }

    return (
        <div className='mainbox w-75 shadow'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <form onSubmit={event => modalFormSubmit(event)}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix1" id="fix1" required defaultValue={modalData[0]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix2" id="fix2" required defaultValue={modalData[1]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix3" id="fix3" required defaultValue={modalData[2]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix4" id="fix4" required defaultValue={modalData[3]} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix5" id="fix5" required defaultValue={modalData[4]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix6" id="fix6" required defaultValue={modalData[5]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix7" id="fix7" required defaultValue={modalData[6]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix8" id="fix8" required defaultValue={modalData[7]} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix9" id="fix9" required defaultValue={modalData[8]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix10" id="fix10" required defaultValue={modalData[9]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix11" id="fix11" required defaultValue={modalData[10]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix12" id="fix12" required defaultValue={modalData[11]} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix13" id="fix13" required defaultValue={modalData[12]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix14" id="fix14" required defaultValue={modalData[13]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix15" id="fix15" required defaultValue={modalData[14]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix16" id="fix16" required defaultValue={modalData[15]} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix17" id="fix17" required defaultValue={modalData[16]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix18" id="fix18" required defaultValue={modalData[17]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix19" id="fix19" required defaultValue={modalData[18]} />
                                    </div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="number" className="form-control" name="fix20" id="fix20" required defaultValue={modalData[19]} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row py-3">
                        <div className="col-6">
                            <button className="btn btn-warning" onClick={event => clearRow(event)}>Xoá hàng dữ liệu</button>
                        </div>
                        <div className="d-flex justify-content-end col-6 pr-4">
                            <button type="submit" className="btn btn-primary mr-3">Sửa dữ liệu</button>
                            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Modal>
            <div className="row">
                <div className="col-9">
                    <form onSubmit={event => addInput(event)} ref={inputForm}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num1" id="num1" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num2" id="num2" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num3" id="num3" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num4" id="num4" required />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num5" id="num5" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num6" id="num6" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num7" id="num7" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num8" id="num8" required />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num9" id="num9" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num10" id="num10" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num11" id="num11" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num12" id="num12" required />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num13" id="num13" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num14" id="num14" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num15" id="num15" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num16" id="num16" required />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num17" id="num17" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num18" id="num18" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num19" id="num19" required />
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <input type="number" className="form-control" name="num20" id="num20" required />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row py-3">
                            <div className="col-6">
                                <button className="btn btn-warning mr-3" onClick={event => deleteAll(event)}>Xoá dữ liệu</button>
                                <ExportToExcel dataSet={countLst} />
                            </div>
                            <div className="d-flex justify-content-end col-6 pr-4">
                                <button type="reset" className="btn btn-danger mr-3">Điền lại</button>
                                <button type="submit" className="btn btn-primary">Thêm dữ liệu</button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <List
                            height={320}
                            itemCount={inputLst.length}
                            itemSize={50}
                        >
                            {Row}
                        </List>
                    </div>
                </div>
                <div className="col-3">
                    <List
                        height={580}
                        itemCount={R.keys(countLst).length}
                        itemSize={40}
                    >
                        {countRow}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MainBox);