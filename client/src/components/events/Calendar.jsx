import { format } from "date-fns";
import { startTime } from "../../../public/js/calendar";

export default function Calendar() {
  return (
    <>
      <div className="calendar container">
        <div className="card">
          <div className="front">
            <div className="contentfront">
              <div className="month">
                <table>
                  <tbody>
                    <tr className="orangeTr">
                      <th>M</th>
                      <th>T</th>
                      <th>W</th>
                      <th>T</th>
                      <th>F</th>
                      <th>S</th>
                      <th>S</th>
                    </tr>
                    <tr className="whiteTr">
                      <th></th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                    </tr>
                    <tr className="whiteTr">
                      <th>7</th>
                      <th>8</th>
                      <th>9</th>
                      <th>10</th>
                      <th>11</th>
                      <th>12</th>
                      <th>13</th>
                    </tr>
                    <tr className="whiteTr">
                      <th>14</th>
                      <th>15</th>
                      <th>16</th>
                      <th>17</th>
                      <th>18</th>
                      <th>19</th>
                      <th>20</th>
                    </tr>
                    <tr className="whiteTr">
                      <th>21</th>
                      <th>22</th>
                      <th>23</th>
                      <th>24</th>
                      <th>25</th>
                      <th>26</th>
                      <th>27</th>
                    </tr>
                    <tr className="whiteTr">
                      <th>28</th>
                      <th>29</th>
                      <th>30</th>
                      <th>31</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="date">
                <div className="datecont">
                  <div id="date">{format(Date.now(), "dd MMMM yyyy")}</div>
                  <div id="day">{format(Date.now(), "dd")}</div>
                  <div id="month">{format(Date.now(), "MMM")}</div>
                  <i className="fa fa-pencil edit" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="back">
            <div className="contentback">
              <div className="backcontainer"></div>
            </div>
          </div>
        </div>
      </div>

      <script src="/js/calendar.js" onLoad={() => startTime()}></script>
    </>
  );
}
