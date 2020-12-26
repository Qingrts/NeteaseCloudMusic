<div style={{
              width: 982, 
              margin: "0 auto", 
              border: "1px solid #d3d3d3", 
              borderTop: "0", 
              borderBottom: "0", 
              display: "flex", 
              backgroundColor: "white"}}>
        <div style={{width: "709px",
    padding: '42px 30px 40px 39px'}}>
          <div className={playlistStyles.playlistInfo}>
            <div className={playlistStyles.playlistCoverimg}>
              <img src={this.state.detail.blurCoverUrl} alt=""/>
            </div>
          </div>
        </div>
        <div style={{flex: 1,borderLeft: "1px solid #d3d3d3",padding: "20px 40px 40px 30px"}}>
          <h4 className={playlistStyles.subtitle}>更多节目</h4>
          <div className={playlistStyles.likePlaylist} style={{marginBottom: 30}}>
            
          </div>
        </div>
      </div>