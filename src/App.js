import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () =>
{
    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
    const times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    const [subjects, setSubjects] = useState([]);

    let Matrix = [];

    for (let i = 0; i < 14; ++i)
    {
        Matrix[i] = [];
        for (let j = 0; j < 7; ++j) Matrix[i][j] = 0;
    }

    useEffect(() =>
    {
        const getData = async () =>
        {
            const response = await axios.get('http://127.0.0.1:8000/subjects');
            setSubjects(response.data.ds_thoi_khoa_bieu);
        }
        getData();
    }, []);

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {
                            days.map((day) =>
                            (
                                <th className='cell'>{ day }</th>
                            ))
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        times.map((time, timeIndex) =>
                        (
                            <tr>
                                <td className='cell'>{ `Tiết ${ timeIndex + 1 }` }</td>
                                {
                                    days.map((day, dayIndex) =>
                                    {
                                        const matchingSubject = subjects.filter((subject) =>
                                        {
                                            let studyDay = 'Thứ ' + subject.thu_kieu_so.toString();
                                            let studyPeriod = 'Tiết ' + subject.tiet_bat_dau.toString();
                                            if (studyDay === 'Thứ 8') studyDay = 'Chủ Nhật';
                                            return studyDay === day && studyPeriod === `Tiết ${ timeIndex + 1 }`;
                                        });

                                        if (matchingSubject.length)
                                        {
                                            Matrix[timeIndex][dayIndex] = 1;
                                            for (let i = 1; i < matchingSubject[0].so_tiet; ++i) Matrix[timeIndex + i][dayIndex] = 1;
                                            if (matchingSubject[0].ma_to_th !== '')
                                            {
                                                return (
                                                    <td rowSpan={ matchingSubject[0].so_tiet } style={ { border: '2px solid #d9831f', backgroundColor: '#f8d7da' } }>
                                                        <div>
                                                            <b>{ matchingSubject[0].ten_mon } ({ matchingSubject[0].ma_mon })</b>
                                                        </div>
                                                        <div><b>Nhóm:</b> { matchingSubject[0].ma_nhom }</div>
                                                        <div><b>Phòng:</b> { matchingSubject[0].ma_phong }</div>
                                                        <div><b>GV:</b> { matchingSubject[0].ten_giang_vien }</div>
                                                    </td>
                                                );
                                            }
                                            return (
                                                <td className='subject' rowSpan={ matchingSubject[0].so_tiet } style={ { border: '2px solid #ad171c' } }>
                                                    <div>
                                                        <b>{ matchingSubject[0].ten_mon } ({ matchingSubject[0].ma_mon })</b>
                                                    </div>
                                                    <div><b>Nhóm:</b> { matchingSubject[0].ma_nhom }</div>
                                                    <div><b>Phòng:</b> { matchingSubject[0].ma_phong }</div>
                                                    <div><b>GV:</b> { matchingSubject[0].ten_giang_vien }</div>
                                                </td>
                                            );
                                        }
                                        else if (!Matrix[timeIndex][dayIndex]) return <td></td>;
                                        return null;
                                    }
                                    ) }
                                <td className='cell'>{ time }</td>
                            </tr>
                        ))
                    }
                </tbody>
                <thead>
                    <tr>
                        <th></th>
                        {
                            days.map((day) =>
                            (
                                <th className='cell'>{ day }</th>
                            ))
                        }
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}
export default App;
