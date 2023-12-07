import segmentation_models_pytorch as smp
import torch
import torchvision.transforms as T
from skimage.morphology import binary_dilation
import matplotlib.pyplot as plt
import cv2
from PIL import Image
import numpy as np
class BrainTumorSegmentation():

    def __init__(self):
        self.IMAGE_SIZE = 256
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = self.load_model()

    def load_model(self):
        model = smp.Unet(
            encoder_name="efficientnet-b7",
            encoder_weights="imagenet",
            in_channels=3,
            classes=1,
            activation='sigmoid',
        )
        print('loadMRi')
        model.to(self.device)

        model_load_path = './model/brain_model.pth'
        checkpoint = torch.load(model_load_path, map_location=torch.device('cpu'))
        model.load_state_dict(checkpoint)
        model.eval()  # Đặt mô hình vào chế độ đánh giá
        return model
    def predict(self,image):
        img = T.functional.to_tensor(image)
        img = img.unsqueeze(0)  # Thêm chiều số lượng mẫu
                

        # Chuyển đổi ảnh và thực hiện dự đoán từ mô hình
        with torch.no_grad():
            img = img.to(self.device)
            prediction1 = self.model(img).to('cpu')[0][0]
            prediction1 = torch.where(prediction1 > 0.5, 1, 0)
            prediction_edges1 = prediction1 - binary_dilation(prediction1)
            img[0, 1, prediction_edges1.bool()] = 1
            result_img = img[0].to('cpu').permute(1, 2, 0)
            result = (result_img.numpy() * 255).astype(np.uint8)
            lb = []
        return result,lb